import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color:${({ theme }) => theme.COLORS.GOOGLE_BLUE};
  border-radius: 5px;
  margin-top: 10px;
`;

export const ButtonAlign = styled.View`
display: flex;
flex-direction: row;
justify-content: space-around;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: 7px;
`;
