package lab.com.demo.controller;

import lab.com.demo.domain.Employee;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;


@Controller
public class EmployeeController {

	private static final Log logger = LogFactory.getLog(EmployeeController.class);

	@RequestMapping(value = { "/", "employee_input" })
	public String inputEmployee(@ModelAttribute("employee") Employee employee) {
		return "EmployeeForm";
	}

	@RequestMapping(value = "/employee_save")
	public String saveEmployee(@Valid Employee emp, BindingResult bindingResult,
			Model model) {
		System.out.println("test=============>" + emp.getId());
//		if (bindingResult.hasErrors()) {
//			return "EmployeeForm";
//		}
//
//		String[] suppressedFields = bindingResult.getSuppressedFields();
//		if (suppressedFields.length > 0) {
//			throw new RuntimeException("Attempt to bind fields that haven't been allowed in initBinder(): "
//					+ StringUtils.addStringToArray(suppressedFields, ", "));
//		}

		// save product here
		model.addAttribute("employee", emp);

		return "EmployeeDetails";
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		// binder.setDisallowedFields(new String[]{"firstName"});
	}
}
