export default class CoreService {
  constructor(api) {
    this.api = api;
  }

  getDwarfityByTokenId = async (tokenId) => {
    const response = await this.api.get('/dwarf-token/' + tokenId);

    if (response.status === 200) {
      return response.data;
    } else {
      return undefined;
    }
  };

  getMetadataByTokenId = async (tokenId) => {
    const response = await this.api.get('/dwarf/' + tokenId);

    if (response.status === 200) {
      return response.data;
    } else {
      return undefined;
    }
  };
}
