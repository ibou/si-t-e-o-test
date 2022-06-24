<?php

declare(strict_types=1);

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserDataPersister implements ContextAwareDataPersisterInterface
{
  public function __construct(
    private ContextAwareDataPersisterInterface $decorated,
    private EntityManagerInterface $entityManager,
    private UserPasswordHasherInterface $userPasswordEncoder
  ) {
  }

  public function supports($data, array $context = []): bool
  {
    return $this->decorated->supports($data, $context);
  }

  public function persist($data, array $context = [])
  {

    if (
      $data instanceof User && ($context['collection_operation_name'] ?? null) === 'post'
    ) {
      $data->setPassword($this->userPasswordEncoder->hashPassword($data, $data->getPassword()));
    }
    return $this->decorated->persist($data, $context);
  }

  public function remove($data, array $context = [])
  {
    return $this->decorated->remove($data, $context);
  }
}
