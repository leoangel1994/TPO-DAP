export const Theme = {
  colors: {
    PRIMARY_1: '#2196F3',
    PRIMARY_2: '#6EB8F5',
    PRIMARY_3: '#9ACEF8',
    SECONDARY_1: '#F37F21',
    SECONDARY_2: '#F8A82E',
    SECONDARY_3: '#FBBF35',
    NEUTRAL_1: '#121212',
    NEUTRAL_2: '#484848',
    NEUTRAL_3: '#797979',
    NEUTRAL_4: '#FFFFFF',
    NEUTRAL_5: '#F5F5F5',
    OPACITY: '#12121288',
  },
  fontSize: {
    TITLE: 30,
    SUBTITLE: 16,
    CARD_TITLE: 24,
    CARD_SUBTITLE: 16,
  },
  fontFamily: {
    BOLD: 'Poppins-Bold',
    SEMIBOLD: 'Poppins-SemiBold',
    REGULAR: 'Poppins-Regular',
  },
};

export const CommonStyle = {
  titleText: {
    fontFamily: Theme.fontFamily.BOLD,
    color: Theme.colors.NEUTRAL_4,
    fontSize: Theme.fontSize.TITLE,
  },
  subTitleText: {
    fontFamily: Theme.fontFamily.SEMIBOLD,
    color: Theme.colors.NEUTRAL_4,
    fontSize: Theme.fontSize.SUBTITLE,
  },
  primaryButton: {
    borderRadius: 10,
    width: 315,
    height: 48,
    backgroundColor: Theme.colors.SECONDARY_2,
  },
  primaryButtonText: {
    color: Theme.colors.NEUTRAL_4,
    fontFamily: Theme.fontFamily.SEMIBOLD,
    fontSize: Theme.fontSize.SUBTITLE,
  },
  input: {
    backgroundColor: Theme.colors.NEUTRAL_4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.colors.SECONDARY_3,
    fontFamily: Theme.fontFamily.REGULAR,
    marginTop: 8,
    marginBottom: 8,
  },
};
