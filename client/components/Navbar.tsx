import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import RMS from '../../assets/RMS.png';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          <div className='flex flex-row items-center'>

          <img className='size-20 mr-8' src={RMS}/>
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90">
            RateMySupervisorCalifornia
          </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/supervisors">
              <Button 
                variant="outline"
                className="text-primary hover:text-primary hover:bg-primary/5"
              >
                Find Supervisors
              </Button>
            </Link>
            <Link to="/organizations">
              <Button 
                variant="outline"
                className="text-primary hover:text-primary hover:bg-primary/5"
              >
                Organizations
              </Button>
            </Link>
            <Button variant="outline" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}