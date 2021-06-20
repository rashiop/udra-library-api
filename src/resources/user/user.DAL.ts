import UserModel from './user.model';

class DataAccess {
  async getManyUser() {
    return await UserModel.find().select('-password').lean().exec();
  }
  
  async getUser(userId) {
    return await UserModel.findById(userId).select('-password').lean().exec()
  }
}

export default DataAccess;