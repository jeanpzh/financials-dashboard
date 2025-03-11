import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";

export default function ReportSkeleton() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <Skeleton className="h-9 w-64" /> 
        <Skeleton className="h-5 w-96 mt-2" /> 
      </div>

      <Tabs defaultValue="monthly">
        <TabsList>
          <Skeleton className="h-9 w-[300px]" />
        </TabsList>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <Skeleton className="h-9 w-64" /> 
            <Skeleton className="h-5 w-96 mt-2" /> 
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Skeleton className="h-9 w-64" /> 
              <Skeleton className="h-5 w-96 mt-2" /> 
            </Card>
            <Card>
              <Skeleton className="h-9 w-64" /> 
              <Skeleton className="h-5 w-96 mt-2" /> 
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Skeleton className="h-6 w-48" /> 
              <Skeleton className="h-4 w-72" /> 
            </Card>
            <Card>
              <Skeleton className="h-6 w-48" /> 
              <Skeleton className="h-4 w-72" /> 
            </Card>
          </div>
          <Card>
            <Skeleton className="h-9 w-64" /> 
            <Skeleton className="h-5 w-96 mt-2" /> 
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
