package es.unican.tfg.service;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import es.unican.tfg.model.ResultFile;
import es.unican.tfg.repository.ResultFileRepository;

@Service
public class ResultFileService {

	@Autowired
	private ResultFileRepository resultFileRepository;

	
	public ResultFile findById(long id) {
		return resultFileRepository.findById(id).orElse(null);
	}
	
	/**]
	 * To store ONLY THE FILE AND FILENAME in database
	 * @param file multipartFileName
	 * @return the saved instance.
	 * @throws IOException
	 */
	public ResultFile store(MultipartFile file) throws IOException {
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		byte[] bytes = file.getBytes();
		
		ResultFile resultFile = new ResultFile(fileName, bytes);
		ResultFile rf = resultFileRepository.save(resultFile);
				
		return rf;
	}

	public ResultFile getFile(long id) {
		return resultFileRepository.findById(id).get();
	}
	
	public Stream<ResultFile> getAllFiles() {
	    return resultFileRepository.findAll().stream();
	  }


}
