// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm'
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';



interface Request {
  title : string;
  type : "income" | "outcome";
  value : number;
  category :  string;
}

class CreateTransactionService {
  public async execute({title,type,value,category} : Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository)


    //verificar se a categoria existe
    //se existar usar o id q foi retornado
    //n existe o pai cria ela



    const { total } = await transactionsRepository.getBalance()


    if(type === 'outcome' && total < value){
      throw new AppError("You do not have enough balance")
    }


    const categoryRepository = getRepository(Category)

    let transactionCategory = await categoryRepository.findOne({
      where : {
        title : category
      }
    })

    if(!transactionCategory){

     transactionCategory = categoryRepository.create({
        title : category
      })

      await  categoryRepository.save(transactionCategory)

      console.log(transactionCategory, 'criei uma nova category aq')
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category : transactionCategory
    })

    await transactionsRepository.save(transaction)


    return transaction
  }
}

export default CreateTransactionService;
