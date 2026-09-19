import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { getStoredCheckIns } from '../utils/emotionalStorage';
import { getCompletedActivities } from '../utils/activityStorage';

function mapCheckIn(item) {
  return {
    id: item._id || item.id,
    date: item.date,
    mood: item.mood,
    emotion: item.emotion,
    intensity: item.intensity,
    note: item.note || '',
  };
}

function mapActivity(item) {
  return {
    id: item._id || item.id,
    activityId: item.activityId,
    status: item.status,
    completedAt: item.completedAt
      ? new Date(item.completedAt).toISOString()
      : null,
    responses: item.answers || {},
  };
}

export function useStudentProgress() {
  const [checkIns, setCheckIns] = useState(() => getStoredCheckIns());
  const [completedActivities, setCompletedActivities] = useState(() => getCompletedActivities());
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setSyncError('');

    try {
      const [checkInsResponse, activitiesResponse] = await Promise.all([
        api.getCheckIns(),
        api.getActivityProgress(),
      ]);

      const nextCheckIns = (checkInsResponse.items || []).map(mapCheckIn);
      const nextActivities = (activitiesResponse.items || [])
        .filter((item) => item.status === 'completed')
        .map(mapActivity);

      setCheckIns(nextCheckIns);
      setCompletedActivities(nextActivities);
    } catch (error) {
      setSyncError(error.message || 'No fue posible sincronizar tus datos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    checkIns,
    completedActivities,
    loading,
    syncError,
    refresh,
    setCheckIns,
    setCompletedActivities,
  };
}
