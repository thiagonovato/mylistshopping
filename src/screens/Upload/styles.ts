import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
`;

export const EmptyPhotoContainer = styled.View`
  width: 270px;
  height: 270px;
  border-width: 3px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.COLORS.GRAY50};
  border-style: dashed;
  justify-content: center;
  align-items: center;
`;


export const Content = styled.View`
  width: 270px;
  align-items: center;
`;

export const Progress = styled.Text`
  font-size: 44px;
  font-family: ${({ theme }) => theme.FONTS.MEDIUM};
  color: ${({ theme }) => theme.COLORS.GRAY900};
  margin-Top: 48px;
`;

export const Transferred = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY900};
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  buttonViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginRight: 30
  },
  buttonBack: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.COLORS.RED,
    borderRadius: 50,
    width: 70,
    height: 70,
    bottom: 0
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  boxCamera: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 200
  }
})