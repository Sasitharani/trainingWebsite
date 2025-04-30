import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state) => state.user); // Fetch the entire user state
    const { username, email } = user;
    console.log('User state:', user); // Log the entire user state
    const membership = useSelector((state) => state.user.membership);
    console.log('Membership from Redux:', membership);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <p className="text-lg mb-2">Username: {username}</p>
                <p className="text-lg mb-2">Email: {email}</p>
                <p className="text-lg mb-2">Membership: {membership}</p>
            </div>
        </div>
    );
};

export default UserProfile;
