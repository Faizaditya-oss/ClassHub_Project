const ClassModel = require('../models/classModel');
const MemberModel = require('../models/memberModel');
const ActivityModel = require('../models/activityModel');

exports.getHomePage = async (req, res) => {
  try {
    const classInfo = await ClassModel.getInfo();
    const stats = await ClassModel.getStatistics(classInfo);
    const [featuredMembers, recentActivities] = await Promise.all([
      MemberModel.getFeatured(),
      ActivityModel.getRecent(3)
    ]);

    res.render('home', {
      title: 'Beranda - CLASSHUB',
      activePage: 'home',
      classInfo,
      stats,
      featuredMembers,
      recentActivities,
      dbError: false
    });
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).render('home', {
      title: 'Beranda - CLASSHUB',
      activePage: 'home',
      classInfo: null,
      stats: {
        totalStudents: 0,
        totalActivities: 0,
        activeProjects: 0,
        achievements: 0
      },
      featuredMembers: [],
      recentActivities: [],
      dbError: true
    });
  }
};
