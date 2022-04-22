import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
align-items: center;
justify-content: center;
padding: 0 30px 100px;
background-color: #312e38;
`;
export const Title = styled.Text`
font-size: 24px;
color: #f4ede8;
font-family: 'Roboto-Medium';
margin: 14px 0 24px;
`;

export const BackToSigIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0%;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSigInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  margin-left: 16px;
`;
