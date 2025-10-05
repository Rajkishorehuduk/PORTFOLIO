const CounterButton = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  return React.createElement('div', null,
    React.createElement('h1', null, 'Simple Click Counter'),
    React.createElement('p', null, `You clicked the button ${count} times.`),
    React.createElement('button', { onClick: handleClick }, 'Click Me!')
  );
};

ReactDOM.createRoot(document.getElementById('counter-demo')).render(React.createElement(CounterButton));
