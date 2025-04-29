import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { username, email, membership } = useSelector((state) => state.user);

    console.log('Username slice:', username);
    console.log('Email slice:', email);
    console.log('Membership slice: ', membership);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <p className="text-lg mb-2">Username: {username}</p>
                <p className="text-lg mb-2">Email: {email}</p>
                <p className="text-lg">Membership: {membership}</p>
            </div>
        </div>
    );
};

export default UserProfile;
