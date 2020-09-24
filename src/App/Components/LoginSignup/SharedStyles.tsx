import styled from 'styled-components'

interface ContainerProps {
  backgroundColor?: string
}
export const Container = styled.div<ContainerProps>`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bluishWhite};
`

export const LoginContainer = styled.div`
  width: 380px;
  height: 490px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

interface SectionProps {
  height?: string
}
export const Section = styled.div<SectionProps>`
  height: 60px;
`

export const OnboardingTitle = styled.p`
  color: ${({ theme }) => theme.colors.offBlack};
  font-size: 22px;
  font-weight: 600;
  line-height: 29px;
  text-align: center;
  margin: 0;
  padding: 0;
`

export const OnboardingText = styled.p`
  color: ${({ theme }) => theme.colors.offBlack};
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  text-align: center;
  align-self: center;
`

export const OnboardingTextEmphasized = styled(OnboardingText)`
  color: #3a465e;
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  text-align: center;
`

export const OnboardingSmallText = styled(OnboardingText)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`
export default {
  Container,
  Section,
  OnboardingTitle,
  OnboardingText,
  OnboardingTextEmphasized,
  OnboardingSmallText,
}
