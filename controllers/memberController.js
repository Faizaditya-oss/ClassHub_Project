const MemberModel = require('../models/memberModel');

exports.getMembersPage = async (req, res) => {
  try {
    const [members, totalCount] = await Promise.all([
      MemberModel.getAll(),
      MemberModel.getCount()
    ]);

    res.render('members', {
      title: 'Anggota Kelas - CLASSHUB',
      activePage: 'members',
      members,
      totalCount,
      dbError: false
    });
  } catch (error) {
    console.error('Error rendering members page:', error);
    res.status(500).render('members', {
      title: 'Anggota Kelas - CLASSHUB',
      activePage: 'members',
      members: [],
      totalCount: 0,
      dbError: true
    });
  }
};
