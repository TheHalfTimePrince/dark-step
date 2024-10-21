const UploadSample = ({samplerSample, setSamplerSample}:{samplerSample:any, setSamplerSample:any}) => {
    return (
        <>
        <div className="flex flex-col  items-center justify-center">
              <label
                htmlFor="fileUpload"
                className="bg-secondary/20 hover:cursor-pointer text-center p-20 text-9xl w-fit rounded-lg custom-file-upload"
              >
                💾
              </label>
              <input
                id="fileUpload"
                type="file"
                disabled={samplerSample !== null}
                className="hidden"
                onChange={(event) => {
                  if (event.target.files !== null) {
                    const file: Blob = event.target.files[0];
                    if (!file) {
                      alert("No file selected.");
                      return;
                    }
                    if (file.type !== "audio/wav") {
                      alert("File must be a .wav audio.");
                      return;
                    }
                    if (file.size > 10097152) {
                      alert("File must be less than 10MB.");
                      return;
                    }
                    setSamplerSample(file);
                  }
                }}
                accept="audio/wav"
              />
            </div>
        </>
    );
};

export default UploadSample;