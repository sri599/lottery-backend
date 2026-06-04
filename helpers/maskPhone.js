function maskPhone(phone) {

  if (!phone) return '';

  return (
    phone.substring(0, 3) +
    '****' +
    phone.substring(phone.length - 3)
  );

}

module.exports = maskPhone;