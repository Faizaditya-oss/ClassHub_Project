const ActivityModel = require('../models/activityModel');

exports.getActivitiesPage = async (req, res) => {
  try {
    const [activities, totalActivities] = await Promise.all([
      ActivityModel.getAll(),
      ActivityModel.getCount()
    ]);

    res.render('activities', {
      title: 'Kegiatan Kelas - CLASSHUB',
      activePage: 'activities',
      activities,
      totalActivities,
      dbError: false
    });
  } catch (error) {
    console.error('Error rendering activities page:', error);
    res.status(500).render('activities', {
      title: 'Kegiatan Kelas - CLASSHUB',
      activePage: 'activities',
      activities: [],
      totalActivities: 0,
      dbError: true
    });
  }
};
