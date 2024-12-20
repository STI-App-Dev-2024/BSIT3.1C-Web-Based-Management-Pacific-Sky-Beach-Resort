import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFiles';

// assets
import { CameraOutlined } from '@ant-design/icons';

const RootWrapper = styled('div')(({ theme }) => ({
  width: 124,
  height: 124,
  borderRadius: '50%',
  border: `1px dashed ${theme.palette.primary.main}`,
  background: theme.palette.primary.light
}));

const DropzoneWrapper = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9
    }
  }
});

const PlaceholderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#eee',
  transition: '.3s',
  '&:hover': { opacity: 0.7, background: 'rgba(51, 51, 51, 0.75)' }
}));

// ==============================|| UPLOAD - AVATAR ||============================== //

const AvatarUpload = ({ error, file, setFieldValue, initialFile, sx }) => {
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        'files',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = (file && file.length && Array.isArray(file)) > 0
    ? file?.map((item) => (
      <img
        key={item.name}
        alt={item.name}
        src={item.preview}
        onLoad={() => URL.revokeObjectURL(item.preview)}
      />
    ))
    : initialFile && (
      <img
        alt="Initial Upload"
        src={initialFile}
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
    );

  return (
    <>
      <RootWrapper
        sx={{
          ...((isDragReject || error) && {
            borderColor: 'error.light'
          }),
          ...sx
        }}
      >
        <DropzoneWrapper {...getRootProps()} sx={{ ...(isDragActive && { opacity: 0.6 }) }}>
          <input {...getInputProps()} />
          {thumbs}
          <PlaceholderWrapper
            className="placeholder"
            sx={{
              ...(thumbs && {
                opacity: 0,
                color: 'common.white',
                bgcolor: '#333'
              }),
              ...((isDragReject || error) && {
                bgcolor: 'error.lighter'
              })
            }}
          >
            <Stack spacing={0.5} alignItems="center">
              <CameraOutlined style={{ color: theme.palette.secondary.main, fontSize: '2rem' }} />
              <Typography color="secondary">Upload</Typography>
            </Stack>
          </PlaceholderWrapper>
        </DropzoneWrapper>
      </RootWrapper>
      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </>
  );
};

AvatarUpload.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.array,
  setFieldValue: PropTypes.func,
  initialFile: PropTypes.string,
  sx: PropTypes.object
};

export default AvatarUpload;
