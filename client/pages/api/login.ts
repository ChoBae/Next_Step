import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

// import type 이후는 한칸 띄워야함..
import userData from './userData.json';

const userArray = userData.users;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { id, password } = req.body;
    console.log(id, password);
    const userItem = userArray.find((object: any) => object.id === id);
    if (userItem != null) {
      if (userItem.password === password) {
        const secret = 'Secret_Key';
        try {
          const accessToken = await new Promise((resolve, reject) => {
            jwt.sign(
              {
                memberId: userItem?.id, //payload에 담을 id
                memberName: userItem?.name, //payload에 담을 name
              },
              secret, // secret key
              {
                expiresIn: '5m', //토큰 유효 시간
              },
              (err, token) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(token);
                }
              },
            );
          });
          res.json({ success: true, accessToken }); //토큰을 담아서 Response
        } catch (err) {
          console.log(err);
          res.json({
            success: false,
            errormessage: '토큰 서명에 실패했습니다.',
          });
        }
      } else {
        res.json({
          success: false,
          errormessage: '아이디와 비밀번호가 일치하지 않습니다.',
        });
      }
    } else {
      res.json({
        success: false,
        errormessage: '아이디와 비밀번호가 일치하지 않습니다.',
      });
    }
  }
}
