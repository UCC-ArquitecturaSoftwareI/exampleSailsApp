/**
 * SmsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  newSms: async function (req, res) {
    const contenido = req.param('contenido');
    const sms = await Sms.create({
      sms: contenido,
      writer: req.session.user.id,
    });

    res.redirect('/');
  },
  newSmsView: async function (req, res) {
    res.view('pages/newSms');
  },
  listSms: async function (req, res) {
    const allSms = await Sms.find().populate('writer').populate('likes');
    res.view('pages/homepage', { allSms });
  },
  like: async function (req, res) {
    const smsId = req.param('smsId');
    const userId = req.session.user.id;

    const sms = await Sms.findOne(smsId).populate('likes');
    if (!sms) {
      res.notFound();
    }
    // const user = sms.likes.find((el)=>{return el.id === userId});
    const user = sms.likes.find(el => el.id === userId);

    if (user) {
      await Sms.removeFromCollection(smsId, 'likes').members(userId);
    } else {
      await Sms.addToCollection(smsId, 'likes').members(userId);
    }
    res.redirect('/');
  }
};

