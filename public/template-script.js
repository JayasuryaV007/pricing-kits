(function () {
  function handleEvent(event) {
    const element = event.target;
    console.log(element)
    const elementData = {
      id: element.id,
      className: element.className,
      tagName: element.tagName,
      eventType: event.type,
    };

    window.parent.postMessage(
      {
        type: 'ELEMENT_INTERACTION',
        data: elementData,
      },
      '*',
    );
  }

  document.addEventListener('click', handleEvent);
  document.addEventListener('mouseover', handleEvent);
  document.addEventListener('mouseout', handleEvent);
})();
