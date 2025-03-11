"use server";

import { db } from "@/db/drizzle";
import { goals, category } from "@/db/schema";
import { DrizzleError, eq } from "drizzle-orm";
import { GoalFormData } from "@/app/dashboard/goals/schema";
import { auth } from "@/auth";
import { AuthError } from "next-auth";

export async function getGoals() {
  const session = await auth();
  try {
    if (!session || !session.user?.id) return;
    const goalsWithDetails = await db
      .select({
        id: goals.id,
        name: goals.name,
        targetAmount: goals.targetAmount,
        currentAmount: goals.currentAmount,
        deadline: goals.deadline,
        categoryId: goals.categoryId,
        category: category.name,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .leftJoin(category, eq(goals.categoryId, category.id))
      .where(eq(goals.userId, session.user?.id));
    return goalsWithDetails;
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Error: ", error.message);
    } else if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
    if (error instanceof AuthError) {
      console.log("Error: ", error.message);
    }
  }
}

export const getCategories = async ({ type }: { type: "options" | "all" }) => {
  try {
    const categories = await db
      .select(
        type === "options"
          ? {
              value: category.id,
              label: category.name,
            }
          : {
              id: category.id,
              name: category.name,
              type: category.type,
              color: category.color,
            }
      )
      .from(category);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    if (error instanceof AuthError) {
      console.log("Error: ", error.message);
    }
    return [];
  }
};

export const createGoal = async (newGoal: GoalFormData) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) return;
    await db.insert(goals).values({
      name: newGoal.name,
      targetAmount: parseInt(newGoal.targetAmount),
      currentAmount: parseInt(newGoal.currentAmount),
      deadline: newGoal.deadline,
      categoryId: newGoal.category,
      createdAt: new Date().toISOString(),
      userId: session.user?.id,
    });
    return { success: true, message: "Goal created successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Error: ", error.message);
      return { success: false, error: "Failed to create goal" };
    }
    console.error("Error creating goal:", error);
    return { success: false, error: "Failed to create goal" };
  }
};

export const updateGoal = async (id: number, updatedGoal: GoalFormData) => {
  const session = await auth();
  if (!session || !session.user?.id) return;
  try {
    await db
      .update(goals)
      .set({
        name: updatedGoal.name,
        targetAmount: parseInt(updatedGoal.targetAmount),
        currentAmount: parseInt(updatedGoal.currentAmount),
        deadline: updatedGoal.deadline,
        categoryId: updatedGoal.category,
        userId: session.user?.id,
        createdAt: new Date().toISOString(),
      })
      .where(eq(goals.id, id));
    return { success: true, message: "Goal updated successfully" };
  } catch (error) {
    console.error("Error updating goal:", error);
    return { success: false, error: "Failed to update goal" };
  }
};

export const deleteGoal = async (id: number) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) return;
    await db.delete(goals).where(eq(goals.id, id));
    return { success: true, message: "Goal deleted successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Error: ", error.message);
      return { success: false, error: "Failed to delete goal" };
    }
    console.error("Error deleting goal:", error);
    return { success: false, error: "Failed to delete goal" };
  }
};
