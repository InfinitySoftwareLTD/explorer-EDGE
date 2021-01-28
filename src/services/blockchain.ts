import ApiService from "@/services/api";
import { IApiBlockchainWrapper } from "../interfaces";

class BlockchainService {
  public async height(): Promise<number> {
    const response = (await ApiService.get("blockchain")) as IApiBlockchainWrapper;
    return response.data.block.height;
  }

  public async supply(): Promise<string> {
    const response = (await ApiService.get("blockchain")) as IApiBlockchainWrapper;
    return response.data.supply;
  }

  public async cur(){
    const data = (await ApiService.getUnlisted());
    var finalBalance = 0;
    for(const sdata of data){
      const wallet = await ApiService.get("wallets/"+ sdata.address);
      const sbalance = wallet.data.balance;
      finalBalance += sbalance;
    }
    return finalBalance;
  }
}

export default new BlockchainService();
