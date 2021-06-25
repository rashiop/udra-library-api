import { ActiveStatus } from '../../helper/activeStatus';
import { commonErrors } from '../../lib/errorManagement';
import { error } from './fine.constant';
import FineModel from './fine.model';


class DataAccess {
  async getCurrentFine() {
    return FineModel.getLatestFine()
  }
  
  async deactiveFine(fineId) {
    const fine = await FineModel.findByIdAndUpdate(
      fineId,
      {
        active_status: ActiveStatus.D
      },
      { new: true, runValidators: true }
    ).lean().exec();

    if (fine == null) {
      throw commonErrors.ResourceNotFoundError({
        message: error.fineNotFound
      })
    }
    
    return fine.amount || 0;
  }
}

export default DataAccess;