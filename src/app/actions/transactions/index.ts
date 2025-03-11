"use server";
import {
  TransactionFormData,
  transactionSchema,
} from "@/app/dashboard/transactions/schema";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { category, transactions, transactionTypes } from "@/db/schema";
import { DrizzleError, eq } from "drizzle-orm";
import { AuthError } from "next-auth";

export async function getAllTransactions() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) return;
    const transactionsDetails = await db
      .select({
        id: transactions.id,
        description: transactions.description,
        amount: transactions.amount,
        type: transactionTypes.type,
        category: category.name,
        categoryId: category.id,
        typeId: transactionTypes.id,
        date: transactions.date,
      })
      .from(transactions)
      .leftJoin(category, eq(transactions.category, category.id))
      .leftJoin(transactionTypes, eq(transactions.typeId, transactionTypes.id))
      .where(eq(transactions.userId, session.user?.id));
    return transactionsDetails;
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Error: ", error.message);
    } else if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
  }
}

export const getOptions = async () => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) return;

    const [categories, types] = await Promise.all([
      getCategoriesOptions(),
      getTypesOptions(),
    ]);
    return { categories, types };
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Error: ", error.message);
    } else if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
  }
};
export const getCategoriesOptions = async () => {
  try {
    return await db
      .select({
        value: category.id,
        label: category.name,
      })
      .from(category);
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Error: ", error.message);
    } else if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
  }
};
export const getTypesOptions = async () => {
  try {
    return await db
      .select({
        value: transactionTypes.id,
        label: transactionTypes.type,
      })
      .from(transactionTypes);
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Error: ", error.message);
    } else if (error instanceof Error) {
      console.log("Error: ", error.message);
    }
  }
};
export const createTransaction = async (
  newTransaction: TransactionFormData
) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) return;
    const res = transactionSchema.safeParse(newTransaction);
    if (!res.success) {
      return { success: false, error: "Invalid data" };
    }
    const data = res.data;

    await db.insert(transactions).values({
      description: data.description,
      amount: parseInt(data.amount),
      date: data.date,
      typeId: data.type,
      category: data.category,
      userId: session.user?.id,
    });
    return { success: true, message: "Transaction created successfully" };
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Database error:", error.message);
      return { success: false, error: `Database error: ${error.message}` };
    } else if (error instanceof Error) {
      console.log("Error creating transaction:", error.message);
      return { success: false, error: `Error: ${error.message}` };
    } else if (error instanceof AuthError) {
      return { success: false, error: "Failed to create transaction" };
    }
    console.error("Unknown error:", error);
    return { success: false, error: "An unknown error occurred" };
  }
};
export const updateTransaction = async (
  updatedTransaction: TransactionFormData,
  id: string
) => {
  try {
    const res = transactionSchema.safeParse(updatedTransaction);
    if (!res.success) {
      return { success: false, error: "Invalid data" };
    }
    const data = res.data;

    await db
      .update(transactions)
      .set({
        description: data.description,
        amount: parseInt(data.amount),
        date: data.date,
        typeId: data.type,
        category: data.category,
      })
      .where(eq(transactions.id, id));
    return { success: true, message: "Transaction updated successfully" };
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Database error:", error.message);
      return { success: false, error: `Database error: ${error.message}` };
    } else if (error instanceof Error) {
      console.log("Error updating transaction:", error.message);
      return { success: false, error: `Error: ${error.message}` };
    }
    console.error("Unknown error:", error);
    return { success: false, error: "An unknown error occurred" };
  }
};
export const deleteTransaction = async (id: string) => {
  try {
    await db.delete(transactions).where(eq(transactions.id, id));
    return { success: true, message: "Transaction deleted successfully" };
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.log("Database error:", error.message);
      return { success: false, error: `Database error: ${error.message}` };
    } else if (error instanceof Error) {
      console.log("Error deleting transaction:", error.message);
      return { success: false, error: `Error: ${error.message}` };
    }
    console.error("Unknown error:", error);
    return { success: false, error: "An unknown error occurred" };
  }
};
