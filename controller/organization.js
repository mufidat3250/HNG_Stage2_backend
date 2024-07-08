const { Organisation, User } = require("../models");

const { v4: uuidv4 } = require("uuid");

const uniqueId = uuidv4();
const createOrganization = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newOrganisation = {
      orgId: uniqueId,
      name,
      description,
    };
    const organisation = await Organisation.create(newOrganisation);
    res.status(201).json({
        status: "success",
        message: "Organisation created successfully",
        data: {
        orgId: organisation.orgId, 
        name: organisation.name, 
        description: organisation.description
        }
    }
    );
  } catch (error) {
    next(error);
  }
};

// [POST] /api/organisations/:orgId/users : adds a user to a particular organisation

const createOrganizationByUser = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const { userId } = req.body;
    const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    let user = await User.findOne({ where: { userId } });

    if (!user) {
      user = await User.create({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        passwordHash: user.passwordHash,
        phone: user.phone,
      });
    }

    // add user to the organization

    await organisation.addUser(user);

    res.status.json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const getOrganizations = async (req, res, next) => {
  try {
    const organisations = await Organisation.findAll();
    console.log(organisations);
    res.status(200).json({
      status: "success",
      message: "All organization belonging to the user",
      data: {
        organisations,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getOrganization = async (req, res, next) => {
  try {
    const organisation = await Organisation.findByPk(req.params.orgId);
    res.status(200).json({
      status: "success",
      message: "<message>",
      data: {
        orgId: organisation.orgId, // Unique
        name: organisation.name, // Required and cannot be null
        description: organisation.description,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  createOrganizationByUser,
};
