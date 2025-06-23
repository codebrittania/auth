export const BankIcon = ({ gateway }: { gateway: string }) => {
  if (gateway.includes("TINKOFF")) {
    return (
      <div className="w-full h-full  rounded-full flex items-center justify-center mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="55"
          height="55"
          viewBox="1 0 24 34"
          fill="none"
        >
          <g clipPath="url(#clip0_50_486)">
            <path
              d="M0.5 5H26.5V18.2411C26.5 21.6365 24.6911 24.7669 21.75 26.471L13.5 31.3307L5.25871 26.471C2.31765 24.7796 0.512622 21.6365 0.512622 18.2411V5H0.5Z"
              fill="#FFDD2D"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 11.9688V16.0836C8.06802 15.4525 9.09044 15.0233 10.2517 15.0233H11.5266V19.8073C11.5266 21.0821 11.1858 22.193 10.6683 22.8115H16.33C15.8125 22.193 15.5 21.0821 15.5 19.8073V15.0233H16.74C17.9139 15.0233 18.9446 15.4525 19.5 16.0836V11.9688H7.5Z"
              fill="#333333"
            />
          </g>
          <defs>
            <clipPath id="clip0_50_486">
              <rect
                width="93"
                height="34"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }

  // По умолчанию — СБП иконка (можно заменить на свою)
  return (
    <div className="w-full h-full  rounded-full flex items-center justify-center mr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="44"
        viewBox="0 0 42 49"
        fill="none"
      >
        <path
          d="M12.1929 24.4954L5.86836 28.1832L0 38.4605L23.9386 24.4954H12.1929Z"
          fill="#874691"
        />
        <path
          d="M30.263 13.9651L23.9384 17.653L18.0701 27.9302L41.9997 13.9651H30.263Z"
          fill="#DA1844"
        />
        <path
          d="M23.9384 10.2773L18.0701 0V21.0697V27.9303V49L23.9384 38.7227V10.2773Z"
          fill="#F9B229"
        />
        <path
          d="M18.0701 0L23.9384 10.2773L30.263 13.9651H41.9997L18.0701 0Z"
          fill="#F07F1A"
        />
        <path
          d="M18.0701 21.0696V48.9999L23.9384 38.7226V31.3378L18.0701 21.0696Z"
          fill="#72B22C"
        />
        <path
          d="M30.263 35.0347L23.9384 38.7225L18.0701 48.9998L41.9997 35.0347H30.263Z"
          fill="#00743E"
        />
        <path
          d="M0 10.5303V38.4605L5.86836 28.1833V20.8075L0 10.5303Z"
          fill="#5F5A94"
        />
        <path
          d="M18.0702 21.0697V21.0787L0 10.5303L5.86836 20.8075L30.2632 35.0348H41.9999L18.0702 21.0697Z"
          fill="#0D90CD"
        />
      </svg>
    </div>
  );
};
