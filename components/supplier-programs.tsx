import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SupplierProjects from "./supplier-projects";
import ProjectInfo from "./project-info";

interface SupplierProgramsProps {
  currentSupplier: string;
  projects: any[]; // Replace 'any' with the correct type for your projects
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
  selectedProjectData: any; // Replace 'any' with the correct type for your project data
}

export function SupplierPrograms({
  currentSupplier,
  projects,
  selectedProject,
  setSelectedProject,
  selectedProjectData,
}: SupplierProgramsProps) {
  if (!currentSupplier) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Inset Programs</CardTitle>
        <CardDescription>
          View and check supplier inset programs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {projects && projects.length > 0 ? (
          <>
            <SupplierProjects
              projects={projects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
            {selectedProject && (
              <div className="mt-6">
                <ProjectInfo project={selectedProjectData} />
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">
            No inset programs found for this supplier.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
