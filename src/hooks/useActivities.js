import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

function mapActivity(item) {
  return {
    id: item.activityId,
    backendId: item.id,
    title: item.title,
    description: item.description || '',
    purpose: item.purpose || '',
    type: item.type || item.category || 'exploration',
    estimatedTime: item.estimatedTime,
    ageRange: item.ageRange || { min: 13, max: 18 },
    competencies: item.competencies || { primary: 'general', secondary: [] },
    emotions: item.emotions || [],
    difficulty: item.difficulty || 'easy',
    repeatable: item.repeatable !== false,
    steps: item.steps || [],
    order: item.order || 0,
    active: item.active !== false,
  };
}

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.getActivities();
      setActivities((response.activities || []).map(mapActivity));
    } catch (requestError) {
      setError(requestError.message || 'No fue posible cargar las actividades.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    activities,
    loading,
    error,
    refresh,
  };
}

export { mapActivity };
