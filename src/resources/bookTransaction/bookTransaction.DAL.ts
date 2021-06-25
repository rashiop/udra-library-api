import { ActiveStatus } from '../../helper/activeStatus';
import { commonErrors } from '../../lib/errorManagement';
import { error } from './bookTransaction.constant';
import BookTransactionModel from './bookTransaction.model';


class DataAccess {
  async returnBook(transactionId, userId) {
    const transaction = await BookTransactionModel.findOne({
      _id: transactionId,
      active_status: ActiveStatus.A
    });

    if (transaction == null) {
      throw commonErrors.ResourceNotFoundError({ message: error.transactionNotFound })
    }
    
    return transaction.returnBook(userId);
  }

  async getUserTransaction(userId) {
    return BookTransactionModel.getByUserId(userId, ActiveStatus.A)
  }
}

export default DataAccess;