import { useState, useEffect } from "react";
import { Building2, MapPin, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SupervisorCard } from "@/components/SupervisorCard";
import { Link, useParams } from "react-router-dom";
import {
  getOrganization,
  getOrganizationSupervisors,
  type Organization,
  type Supervisor,
} from "@/lib/api";
import { toast } from "sonner";

export default function OrganizationDetail() {
  const { id } = useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [orgData, supervisorsData] = await Promise.all([
          getOrganization(id),
          getOrganizationSupervisors(id),
        ]);

        setOrganization(orgData);
        setSupervisors(supervisorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading organization details...</div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Organization not found</div>
      </div>
    );
  }

  // Ensure rating is a number and has 1 decimal place
  const displayRating =
    typeof organization.rating === "number"
      ? organization.rating.toFixed(1)
      : "0.0";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Organization Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 bg-muted rounded-lg" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{organization.name}</h1>
              <div className="text-xl text-muted-foreground mb-4">
                {organization.type}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">Organization Info</div>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {organization.supervisor_count} Supervisors
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      <Star className="h-4 w-4" />
                      <span>{displayRating} average rating</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">Location</div>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      123 Main Street
                      <br />
                      New York, NY 10001
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="text-primary hover:text-primary hover:bg-primary/5"
                  onClick={() =>
                    window.open(organization.website_url, "_blank")
                  }
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
                <Link to={`/organizations/${id}/review`}>
                  <Button
                    variant="outline"
                    className="text-primary hover:text-primary hover:bg-primary/5"
                  >
                    Write a Review
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground">{organization.description}</p>
        </CardContent>
      </Card>

      {/* Supervisors Section */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Our Supervisors</h2>
          <div className="space-y-4">
            {supervisors.length > 0 ? (
              supervisors.map((supervisor) => (
                <SupervisorCard key={supervisor.id} {...supervisor} />
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No supervisors found for this organization
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
