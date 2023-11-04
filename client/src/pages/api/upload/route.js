import multiparty from 'multiparty';
import fs from 'fs';
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
import formidable from 'formidable';

dotenv.config();

export const config = {
  api: {
      bodyParser: false,
  },
};

export default async function POST(req, res) {
    const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
    
    
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      // console.log("fields",fields);
      // console.log("files",files);
      try{
        const eventName = fields.eventName[0];
        const imageUrls = [];
        const responseUrl = [];
        for (const fileField in files) {
          for(const file of files[fileField]){
              //Pin the image to IPFS
              const stream = fs.createReadStream(file.filepath);
              const options = {
                pinataMetadata: {
                    name: eventName,
                },
                pinataOptions: {
                    cidVersion: 0
                }
              };
              const result = await pinata.pinFileToIPFS(stream,options);
              const imageUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
              imageUrls.push(imageUrl);
          }
        }
        console.log(imageUrls);
        const standingEventObject = {
          name: eventName,
          image: imageUrls[0],
          description: "This is an NFT verifying you have entry to the event. You have a standing ticket."
        };
      
        const seatedEventObject = {
          name: eventName,
          image: imageUrls[1],
          description: "Ths is an NFT verifying you have entry to the event. You have a seated ticket."
        };

        const standingEventResult = await pinata.pinJSONToIPFS(standingEventObject);
        const seatedEventResult = await pinata.pinJSONToIPFS(seatedEventObject);

        const standingEventUrl = `https://gateway.pinata.cloud/ipfs/${standingEventResult.IpfsHash}`;
        const seatedEventUrl = `https://gateway.pinata.cloud/ipfs/${seatedEventResult.IpfsHash}`;
        res.status(200).json({standingEventUrl, seatedEventUrl}); 
      }catch (error){
        console.log(error);
      }
    });
};


