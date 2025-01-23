import { useState, useEffect } from "react";

const App = () => {
  const [activeTab, setActiveTab] = useState("newRequest");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [requests, setRequests] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");

  useEffect(() => {
    // Simulate API call to fetch requests
    const fetchRequests = async () => {
      const mockData = [
        {
          id: "#FW2025001",
          projectName: "Project Alpha",
          submittedDate: "Jan 15, 2025",
          status: "Auto-Accepted",
        },
        {
          id: "#FW2025002",
          projectName: "Project Beta",
          submittedDate: "Jan 20, 2025",
          status: "Pending",
        },
      ];
      setRequests(mockData);
    };

    fetchRequests();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredRequests = requests.filter((request: any) => {
    const matchesSearch =
      request.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All Status" || request.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">DBS Firewall Portal</h1>
          {/* <div className="flex items-center">
            <FaUserCircle size={24} className="mr-2" />
            <select className="border border-gray-300 rounded-md p-1">
              <option>User Settings</option>
              <option>Logout</option>
            </select>
          </div> */}
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex mx-auto container mt-8 gap-4 border-b-1 border-b-gray-300">
        <button
          className={`px-4 py-2 font-medium rounded ${
            activeTab === "newRequest"
              ? "border-b-black border-b-1 text-black"
              : "bg-transparent text-black"
          }`}
          onClick={() => setActiveTab("newRequest")}
        >
          New Request
        </button>
        <button
          className={`px-4 py-2 font-medium rounded ${
            activeTab === "trackRequests"
              ? "border-b-black border-b-1 text-black"
              : "bg-transparent text-black"
          }`}
          onClick={() => setActiveTab("trackRequests")}
        >
          Track Requests
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "newRequest" && (
        <main className="container mx-auto mt-8 p-4">
          {/* Request Form */}
          {/* <h2 className="text-lg font-semibold mb-4">New Firewall Request</h2> */}
          <form>
            {/* Requester Details */}
            <section className="mb-8 bg-white shadow rounded-lg p-6">
              <h3 className="text-md font-semibold mb-4">Requester Details</h3>

              <div className="flex gap-4 mb-4">
                <div className="w-full">
                  <label>Requester Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>

                <div className="w-full">
                  <label>Department</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-full">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>

                <div className="w-full">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              </div>
            </section>

            {/* Change Request Details */}
            <section className="mb-8 bg-white shadow rounded-lg p-6">
              <h3 className="text-md font-semibold mb-4">
                Change Request Details
              </h3>

              <div className="flex gap-4 mb-4">
                <div className="flex flex-col w-full">
                  <label>Project/System Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label>Rule Validity</label>
                  <select className="border border-gray-300 rounded-md p-2">
                    <option value="temporary">Temporary</option>
                    <option value="permanent">Permanent</option>
                  </select>
                </div>
              </div>

              <div>
                <label>Request Justification</label>
                <textarea className="border border-gray-300 rounded-md p-2 w-full" />
              </div>

              <div className="flex flex-col mt-4">
                <label>End Date</label>
                <input
                  id="end-date"
                  type="date"
                  placeholder="End Date"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </section>

            {/* Firewall Rules */}
            <section className="mb-8 bg-white shadow rounded-lg p-6">
              <div className="flex justify-between mb-6">
                <h3 className="text-md font-semibold mb-2">Firewall Rules</h3>
                <button
                  type="button"
                  className="bg-black text-white px-4 py-0 rounded-md"
                >
                  + Add Rule
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Source"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Destination"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <select className="border border-gray-300 rounded-md p-2 w-full">
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                </select>
                <input
                  type="number"
                  placeholder="Port"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </section>

            {/* Submit and Cancel */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-transparent text-black border-1 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Submit Request
              </button>
            </div>
          </form>
        </main>
      )}

      {activeTab === "trackRequests" && (
        <div className="min-h-screen container mx-auto mt-8 p-4 bg-white shadow rounded-md">
          <h2 className="text-xl font-semibold mb-4">Track Requests</h2>

          {/* Search and Filters */}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search requests..."
              className="px-4 py-2 border rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Auto-Accepted</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* Requests Table */}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Request ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Project Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Submitted Date
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (request: any) => (
                  <tr key={request.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.projectName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.submittedDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button className="text-blue-500 hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white text-black mt-8 p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <h4 className="font-semibold">Help Resources</h4>
            <ul>
              <li>User Guide</li>
              <li>Documentation</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul>
              <li>Contact IT Support</li>
              <li>Report an Issue</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul>
              <li>Email: support@dbs.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
