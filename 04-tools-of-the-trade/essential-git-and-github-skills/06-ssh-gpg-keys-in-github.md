# SSH and GPG Keys in GitHub

SSH (Secure Shell) and GPG (GNU Privacy Guard) keys are essential tools for securing your GitHub account and ensuring the integrity of your code. Here's a brief overview of each:

## SSH Keys

- **What are SSH Keys?**
  SSH keys are cryptographic keys used to authenticate secure connections between your computer and remote servers, such as GitHub. They consist of a pair of keys: a public key and a private key.

- **What are the public and private keys?**
  - The public key is shared with GitHub or remote servers and is used to encrypt data.
  - The private key is kept secret on your computer and is used to decrypt data that was encrypted with the corresponding public key.

- **How to Generate SSH Keys:**
  You can generate SSH keys using the following command in your terminal:

  ```cmd
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  ```

  This command creates a new SSH key, using the provided email as a label.

- **Adding SSH Keys to GitHub:**
  After generating your SSH key, you need to add the public key to your GitHub account. You can do this by:
  1. Copying the contents of your public key file (usually located at `~/.ssh/id_rsa.pub`). It will look something like this:
  
        ```bash
        ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC3...
        **** youremail@example.com
        ```

  2. Going to your GitHub account settings.
  3. Navigating to "SSH and GPG keys."
  4. Clicking "New SSH key" and pasting your key into the provided field.

## GPG Keys

- **What are GPG Keys?**
  GPG keys are used for signing and encrypting your commits and tags in Git. They help verify the authenticity of your code and ensure that it hasn't been tampered with.

- **How to Generate GPG Keys:**
  You can generate GPG keys using the following command in a **Git Bash Terminal**:

  ```cmd
  gpg --full-generate-key
  ```

  Follow the prompts to create your key pair.

- **Adding GPG Keys to GitHub:**
  After generating your GPG key, you need to add the public key to your GitHub account. You can do this by:
  1. Copying the contents of your public key (you can view it with `gpg --armor --export BE**************************`). It will look something like this:
  
      ```bash
      -----BEGIN PGP PUBLIC KEY BLOCK-----
      mQENBF***************************************
      ...
      ```

  2. Going to your GitHub account settings.
  3. Navigating to "SSH and GPG keys."
  4. Clicking "New GPG key" and pasting your key into the provided field.

By using SSH and GPG keys, you can enhance the security of your GitHub account and ensure the integrity of your code contributions.

For more detailed instructions, refer to the official GitHub documentation:

- [Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) - [Signing commits with GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).
- [Signing commits with GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

For more references, you can check out the following resources:

- [YouTube Video on SSH and GPG Keys](https://www.youtube.com/watch?v=GSIDS_lvRv4)
- [GitHub Docs on SSH Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub Docs on Adding a GPG key to your GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
- [GitHub Docs on Generating a new GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
