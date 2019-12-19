import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;

    transition: border 0.25s ease-out;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 15px 5px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ContainerBootstrap = styled.div.attrs(props => ({
  className: 'container',
  style: {
    backgroundColor: 'white',
    marginTop: 80,
    borderRadius: 18,
    padding: 30,
  },
}))``;

export const Container = styled.div`
  background-color: white;
  margin-top: 20;
  padding: 5;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Container2 = styled.div.attrs(props => ({
  className: 'container',
  style: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 30,
    borderRadius: 18,
    padding: 30,
  },
}))``;

export const P = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export const P2 = styled.p`
  font-size: 14px;
  border: 2px solid #dcdcdc;
  border-radius: 5px;
  padding: 5px;
`;
