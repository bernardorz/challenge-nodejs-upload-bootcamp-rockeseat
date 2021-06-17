import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { getCustomRepository, getRepository } from 'typeorm'
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id:string): Promise<void> {

    const transactionRepositrory = getCustomRepository(TransactionsRepository)

    const transaction = await transactionRepositrory.findOne(id)

    if(!transaction){
      throw new AppError("Transaction does not exist ")
    }



    const response = await transactionRepositrory.remove(transaction)


    return

  }
}

export default DeleteTransactionService;
