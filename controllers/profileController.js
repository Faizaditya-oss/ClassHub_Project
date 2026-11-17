const ClassModel = require('../models/classModel');

exports.getProfilePage = async (req, res) => {
  try {
    const classInfo = await ClassModel.getInfo();

    res.render('profile', {
      title: 'Profil Kelas - CLASSHUB',
      activePage: 'profile',
      classInfo,
      dbError: false
    });
  } catch (error) {
    console.error('Error rendering profile page:', error);
    res.status(500).render('profile', {
      title: 'Profil Kelas - CLASSHUB',
      activePage: 'profile',
      classInfo: null,
      dbError: true
    });
  }
};
