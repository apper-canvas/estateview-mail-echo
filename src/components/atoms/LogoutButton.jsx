import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@/layouts/Root';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const LogoutButton = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      onClick={logout}
      variant="outline"
      size="sm"
      className="flex items-center space-x-1"
    >
      <ApperIcon name="LogOut" size={16} />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;