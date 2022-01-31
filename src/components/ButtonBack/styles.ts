import styled from 'styled-components/native';

type Props = {
  size: 'small' | 'large';
}

export const Container = styled.TouchableOpacity<Props>`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color:  ${({ theme }) => theme.COLORS.GRAY50};
  width: ${({ size }) => size === 'small' ? 40 : 60}px;
  height: ${({ size }) => size === 'small' ? 40 : 60}px;
`;