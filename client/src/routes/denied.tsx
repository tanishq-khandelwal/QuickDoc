
const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <svg className="mx-auto h-20 w-auto text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <h2 className="mt-6 text-center text-5xl leading-9 font-bold text-red-600">Access Denied</h2>
        <p className="mt-4 text-center text-xl leading-5 text-gray-600 max-w">
          You do not have permission to access this page.
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;