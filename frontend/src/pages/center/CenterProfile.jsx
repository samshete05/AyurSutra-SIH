import { Edit, MapPin, Mail, Phone, Calendar } from 'lucide-react';
// Use your preferred icon library

const Sidebar = () => (
  <aside className="w-64 bg-white border-r min-h-screen px-4 py-8">
    <nav className="space-y-2">
      <a href="#" className="font-semibold text-emerald-600">Home</a>
      <a href="#">Treatments</a>
      <a href="#">Appointments</a>
      <a href="#">Patient Records</a>
      <a href="#">Payments</a>
      <div className="border-t mt-4 pt-4">
        <a href="#">Ayurvedic Store</a>
        <a href="#">Settings</a>
      </div>
    </nav>
    <button className="mt-8 w-full bg-emerald-500 text-white py-2 rounded-lg font-bold hover:bg-emerald-600">+ Book Session</button>
  </aside>
);

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const user = {
    name: "Dr. Priya Sharma",
    specialty: "Panchakarma Expert",
    location: "Kerala Ayurvedic Center, Mumbai",
    email: "priya.sharma@ayursutra.com",
    phone: "+91 98765 43210",
    joined: "Jan 2024",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&size=300&background=10b981&color=fff"
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-10 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">My Profile</h1>
            <p className="text-slate-500">Manage practitioner and center details</p>
          </div>
          <button onClick={() => setEditing(!editing)}
            className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
            <Edit className="w-5 h-5 mr-2" />
            Edit
          </button>
        </div>

        <section className="bg-white rounded-xl shadow px-8 py-8 mb-8">
          <div className="flex items-center">
            <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-xl mr-6"/>
            <div>
              <h2 className="text-xl font-bold text-emerald-900">{user.name}</h2>
              <div className="text-emerald-600">{user.specialty}</div>
              <div className="text-slate-500">{user.location}</div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Info Section */}
          <section className="bg-white rounded-xl shadow px-6 py-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Personal Information</h3>
              <button className="text-emerald-500 flex items-center"><Edit className="w-4 h-4 mr-1"/>Edit</button>
            </div>
            <div>
              <div><span className="font-medium text-slate-700">Email:</span> {user.email}</div>
              <div><span className="font-medium text-slate-700">Phone:</span> {user.phone}</div>
              <div><span className="font-medium text-slate-700">Joined:</span> {user.joined}</div>
            </div>
          </section>

          {/* Address Section */}
          <section className="bg-white rounded-xl shadow px-6 py-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Center Address</h3>
              <button className="text-emerald-500 flex items-center"><Edit className="w-4 h-4 mr-1"/>Edit</button>
            </div>
            <div>
              {/* Fill this section with actual address fields */}
              <div><span className="font-medium text-slate-700">Location:</span> {user.location}</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
