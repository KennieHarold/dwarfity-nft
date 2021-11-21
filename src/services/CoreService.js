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

  generateImageByGene = async (gene) => {
    const response = await this.api.get(
      '/dwarf-token/generate-image-from-gene/' + gene
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return undefined;
    }
  };

  addDwarfToDb = async (data) => {
    const response = await this.api.post('/dwarf-token', { ...data });

    if (response.status === 201) {
      return response.data;
    } else {
      return undefined;
    }
  };
}
