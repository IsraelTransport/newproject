class User {
  constructor(fullName, username, email, password, userID, userTypeID, userType) {
      this.fullName = fullName;
      this.username = username;
      this.email = email;
      this.password = password;
      this.userID = userID;
      this.userTypeID = userTypeID;
      this.userType = userType;
  }
}

module.exports = User;
