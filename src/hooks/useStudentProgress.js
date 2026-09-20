import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

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
    startedAt: item.startedAt || null,
    completedAt: item.completedAt ? new Date(item.completedAt).toISOString() : null,
    responses: item.answers || {},
  };
}

export function useStudentProgress() {
  const [checkIns, setCheckIns] = useState([]);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [activityProgress, setActivityProgress] = useState([]);
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

      const nextActivities = (activitiesResponse.items || []).map(mapActivity);

      setCheckIns((checkInsResponse.items || []).map(mapCheckIn));
      setActivityProgress(nextActivities);
      setCompletedActivities(nextActivities.filter((item) => item.status === 'completed'));
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
    activityProgress,
    loading,
    syncError,
    refresh,
    setCheckIns,
    setCompletedActivities,
    setActivityProgress,
  };
}
