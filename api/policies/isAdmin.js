module.exports = async function (req, res, proceed) {

  if (req.session.user && req.session.user.type === 'admin') {
    return proceed();
  }

  return res.forbidden();
};
