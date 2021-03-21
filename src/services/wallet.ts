import ApiService from "@/services/api";
import { IApiWalletsWrapper, IWalletSearchParams } from "../interfaces";
import { paginationLimit } from "@/constants";

class WalletService {
  public async find(address: string) {
    const response = await ApiService.get(`wallets/${address}`);
    return response.data;
  }

  public async top(page = 1, limit: number = paginationLimit) {
    const response = await ApiService.get("wallets/top", {
      params: {
        page,
        limit,
      },
    });

    const unlisted_addresses = await ApiService.getUnlisted();
    var unlisted_add_array = [];
    for(const singleUnlisted of unlisted_addresses){
        const address = singleUnlisted.address;
        unlisted_add_array.push(address);
    }
    
    var unlistedCount = 0;
    response.unlisted_addresses = [];
    var listed_addresses = [];
    for(var i = 0; i < response.data.length; i++){
      const singlewallet = response.data[i];
      const walletAddress = singlewallet.address;
     
      if(unlisted_add_array.includes(walletAddress)){
        response.unlisted_addresses.push(response.data[i]);
        unlistedCount++;
      } else {
        listed_addresses.push(response.data[i]);
      }
    }
    
    if(unlistedCount > 0){
      response.hasUnlisted = '1';
    }

    response.data = listed_addresses;

    return response;
  }

  public async search(
    body: IWalletSearchParams,
    page = 1,
    limit: number = paginationLimit,
  ): Promise<IApiWalletsWrapper> {
    const response = (await ApiService.post("wallets/search", body, {
      params: {
        page,
        limit,
      },
    })) as IApiWalletsWrapper;

    return response;
  }
}

export default new WalletService();
