import UserModel from './user.model';

class DataAccess {
  async getManyUser() {
    return UserModel.find().select('-password').lean().exec();
  }
  
  async getUser(userId) {
    return UserModel.findById(userId).select('-password').lean().exec()
  }
}

export default DataAccess;