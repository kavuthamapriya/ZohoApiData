
import React from 'react';
import { retryFailedHoliday } from '../api';
import "../components/LeaveList";

interface RetryButtonProps {
  formId: number;
}

const RetryButton: React.FC<RetryButtonProps> = ({ formId }) => {
  const handleRetry = async () => {
    await retryFailedHoliday(formId);
  };

  return <button onClick={handleRetry}>Retry</button>;
};

export default RetryButton;