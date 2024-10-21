import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="p-4">
        <h3 className="text-red">Page Not Found</h3>
        <p>
          Sorry The page you were looking for was not found, return to{' '}
          <Link to={'/'} className="text-blue-500">
            Homepage
          </Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
