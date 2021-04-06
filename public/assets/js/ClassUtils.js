class Utils
{

    checkInputs(inputs = [])
    {

        inputs.forEach((input) => {
            if (input.value == '' || !input.value) {
                input.focus();
                return false;
            } else {
                return true;
            }
        });
    }

}

export default Utils;